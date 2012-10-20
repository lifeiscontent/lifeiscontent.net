class Aaronreisman.Routers.StaticRouter extends Backbone.Router
  initialize: (options) ->
    this.bind "all", (route, router) ->
      $('#menu a').removeClass('selected')
      switch Backbone.history.fragment
        when "page/distractions"
          $('#menu a').eq(3).addClass('selected')
        when "page/contact"
          $('#menu a').eq(2).addClass('selected')
        when "page/blog"
          $('#menu a').eq(1).addClass('selected')
        else
          $('#menu a').eq(0).addClass('selected')
  #   @posts = new Aaronreisman.Collections.PostsCollection()
  #   @posts.reset options.posts

  routes:
    "page/:action" : "index"
    ".*" : "index"

  index: (action = 'about') ->
    @view = new Aaronreisman.Views.StaticView()
    $("#content").html(@view.render(action).el)
