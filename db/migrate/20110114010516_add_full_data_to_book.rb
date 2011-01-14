class AddFullDataToBook < ActiveRecord::Migration
  def self.up
    change_table :books do |t|
      t.integer :pages
      t.string :author
      t.string :title
      t.string :description
      t.string :subject
      t.string :publisher
      t.string :language
      t.string :date
      t.datetime :checked_out_at
      t.boolean :verified
    end
  end

  def self.down
  end
end
