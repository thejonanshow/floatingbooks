class BooksBelongToUsers < ActiveRecord::Migration
  def self.up
    change_table :books do |t|
      t.references :user
    end
  end

  def self.down
  end
end
