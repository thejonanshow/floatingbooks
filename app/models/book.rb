class Book < ActiveRecord::Base

  def get_google_data
    url = URI.parse("http://books.google.com/books/feeds/volumes?q=isbn:#{isbn}")
    net_object = Net::HTTP.get_response url
    Hash.from_xml(net_object.body)
  end

  def get_qr_code
  end

end
