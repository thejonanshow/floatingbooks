# Load the rails application
require File.expand_path('../application', __FILE__)

# Initialize the rails application
Floatingbooks::Application.initialize!

# Require Net::http so we can request Google data
require 'net/http'
require 'open-uri'
