class BackboneController < ApplicationController
  def index
    @posts = Post.all
  end
end
