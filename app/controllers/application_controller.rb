class ApplicationController < ActionController::Base
  include PublicActivity::StoreController
  require 'eventful/api'
	require 'app_stats/stats'
  require 'csv'
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
end
