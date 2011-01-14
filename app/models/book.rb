class Book < ActiveRecord::Base
  belongs_to :user
  belongs_to :checked_out_to, :class_name => 'User'

  def populate_data_from_google
    google_data = get_google_data
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

  def get_google_data
    url = URI.parse("http://books.google.com/books/feeds/volumes?q=isbn:#{isbn}")
    net_object = Net::HTTP.get_response url
    Hash.from_xml(net_object.body)
  end

  def get_qr_code
  end

end
