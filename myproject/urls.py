
from django.contrib import admin

from account import views as account_views

from django.urls import path
from diaryapp import views




urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name = 'home'),

    #html form 을 이용해서 블로그

    path('new/', views.new, name = 'new'),
    path('create/', views.create, name = 'create'),


    #django form을 이용해 블로그 객체 만들기 
    path('formcreate/', views.formcreate, name = 'formcreate'),

    path('modelformcreate/', views.modelformcreate, name = 'modelformcreate'),

    path('detail/<int:blog_id>', views.detail,  name ='detail'), #int 말고 문자열이랑 다른것도 가능

    path('login/', account_views.login, name = 'login'),
    path('logout/', account_views.logout, name = 'logout'),

    

]
