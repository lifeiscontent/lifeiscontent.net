class Post < ActiveRecord::Base
  attr_accessible :content, :title
  extend FriendlyId
  friendly_id :title, use: :slugged
end
