class AddAddressToVenue < ActiveRecord::Migration
  def change
    rename_column :venues, :location, :address
  end
end
