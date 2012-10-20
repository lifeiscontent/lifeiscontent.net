class Aaronreisman.Routers.StaticRouter extends Backbone.Router
  # initialize: (options) ->
  #   @posts = new Aaronreisman.Collections.PostsCollection()
  #   @posts.reset options.posts

  routes:
    "page/:action" : "index"
    ".*" : "index"

  index: (action = 'about') ->
    @view = new Aaronreisman.Views.StaticView()
    $("#content").html(@view.render(action).el)
