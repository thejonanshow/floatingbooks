class Book < ActiveRecord::Base
  belongs_to :user
  belongs_to :checked_out_to, :class_name => 'User'

  validates_presence_of :isbn

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
      save
    end
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

end
