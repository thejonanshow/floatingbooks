class ApplicationController < ActionController::Base
  protect_from_forgery

  def stored_location_for(resource)
    if current_user && params[:redirect_to]
      return params[:redirect_to]
    elsif current_user
      return '/books/manage'
    end
    super( resource ) 
  end
  
end
