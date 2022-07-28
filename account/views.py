from django.shortcuts import render, redirect
from django.contrib import auth 
from django.contrib.auth.models import User



# 장고가 가지고 있는 유저 테이블에 장고가 알아서 관리하고 있음 
# auth 저거 로그인 기능 들어가잇는 거

# Create your views here.


def login(request):
    #POST 요청이 들어오면 로그인 처리를 해주고 

    #GET 요청이 들어오면 login form 을 담고 있는 login.html을 띄워주는 역할

    if(request.method == "POST"):
        userid = request.POST['username']
        pwd = request.POST['password']
        user = auth.authenticate(request, username = userid, password = pwd)
        

        if(user is not None):
            auth.login(request, user) #인자로 받는 user객체로 로그인 가능 

            # return redirect('home')
            return redirect('http://127.0.0.1:3000')


        else:
            return  render(request, 'login.html')

        #authenticate 는 맞으면 장고에 저장되어 있는 유저 객체를 반환하고 아니면 Nonde 반환
        #실제로 DB에 있는 아이디와 비번인지 확인해보는거임

    else:
        return render(request, 'login.html')
        

def logout(request):
    auth.logout(request) #request 를 보낸 사람을 logout 시켜라

    return redirect('home')