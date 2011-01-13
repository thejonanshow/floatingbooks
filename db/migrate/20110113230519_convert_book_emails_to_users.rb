class ConvertBookEmailsToUsers < ActiveRecord::Migration
  def self.up
    Book.all.each do |book|
      user = User.find_by_email(book.name)
      unless user
        user = User.create(:email => book.name)
      end
      if user
        book.user = user
        book.save
      end
    end
  end

  def self.down
  end
end
