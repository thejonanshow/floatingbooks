class AddThumbToBooks < ActiveRecord::Migration
  def self.up
    add_column :books, :thumb, :string
  end

  def self.down
    remove_column :books, :thumb
  end
end
