class Book < ActiveRecord::Base
  belongs_to :user
  belongs_to :checked_out_to, :class_name => 'User'

  validates_presence_of :isbn

  after_save :updateIndex

  def populate_data_from_google
    google_data = get_google_data
    if google_data['feed'] && google_data['feed']['entry']
      self.author = google_data['feed']['entry']['creator']
      self.title = google_data['feed']['entry']['title'].first
      self.description = google_data['feed']['entry']['description']
      self.pages = google_data['feed']['entry']['format'].first
      self.subject = google_data['feed']['entry']['subject']
      self.publisher = google_data['feed']['entry']['publisher']
      self.language = google_data['feed']['entry']['language']
      self.date = google_data['feed']['entry']['date']
      self.thumb = google_data['feed']['entry']['link'].first['href']
      save
    end
  end

  def image
    thumb.gsub('&zoom=5','')
  end

  def get_google_data
    url = URI.parse("http://books.google.com/books/feeds/volumes?q=isbn:#{URI.encode(isbn)}")
    net_object = Net::HTTP.get_response url
    Hash.from_xml(net_object.body)
  end

  def qrcode
    "http://chart.googleapis.com/chart?cht=qr&chs=220x220&chld=H|0&chl=http://floatingbooks.heroku.com/books/?isbn=#{URI.encode(isbn)}"
  end

  def get_base64_qrcode
    Base64.encode64(URI.parse(URI.encode("http://chart.googleapis.com/chart?cht=qr&chs=150x150&chld=H|0&chl=#{qrcode}")).read)
  end

  def read_label_file

    File.open(File.join(Rails.root, 'public', 'floating.label')).read.gsub('{{{IMAGE}}}', get_base64_qrcode).gsub(/[\n|\t|\r]/, "").html_safe

  end
  
  def updateIndex(indexTankIndex = nil)
    unless indexTankIndex
      client = IndexTank::Client.new(ENV['INDEXTANK_API_URL'] || 'http://:J4Ya5G8AVcUtJf@72iu.api.indextank.com')  
      indexTankIndex = client.indexes(INDEXTANK_INDEX)
    end

    indexTankIndex.document(self.id.to_s).add({:text => self.title, 
                                      :title => self.title,
                                      :author => self.author,
                                      :description => self.description,
                                      :subject => self.subject})
  end

  def self.search_all(query)
    client = IndexTank::Client.new(ENV['INDEXTANK_API_URL'] || 'http://:J4Ya5G8AVcUtJf@72iu.api.indextank.com')  
    index = client.indexes(INDEXTANK_INDEX)
    
    index.search("#{query} OR title:#{query} OR author:#{query} OR description:#{query} OR subject:#{query}")
  end

  def self.index
    client = IndexTank::Client.new(ENV['INDEXTANK_API_URL'] || 'http://:J4Ya5G8AVcUtJf@72iu.api.indextank.com')  
    index = client.indexes(INDEXTANK_INDEX)

    all.each do |book|
      book.updateIndex(index)
    end
  end
end
