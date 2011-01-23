class AllowNullPasswords < ActiveRecord::Migration
  def self.up
    change_table :users do |t|
      t.change :encrypted_password, :string, :null => true
    end
  end

  def self.down
  end
end
