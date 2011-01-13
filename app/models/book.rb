class Book < ActiveRecord::Base

  def get_google_data(isbn)
    Net::HTTP.get_print "http://books.google.com/books/feeds/volumes?q=isbn:#{isbn}"
  end

end
