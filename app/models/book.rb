class Book < ActiveRecord::Base
<<<<<<< HEAD

  def get_google_data
    url = URI.parse("http://books.google.com/books/feeds/volumes?q=isbn:#{isbn}")
    net_object = Net::HTTP.get_response url
    Hash.from_xml(net_object.body)
  end

  def get_qr_code
  end

=======
  belongs_to :user
>>>>>>> b99473cf5a6bf444084bf0b539a2377694127da4
end
