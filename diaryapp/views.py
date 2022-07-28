from django.shortcuts import render, redirect, get_object_or_404
from .models import Blog # models.py 로 부터 Blog 를 갖고오기
from django.utils import timezone
from .forms import BlogForm, BlogModelForm


#.은 같은 폴더에 있다는 뜻

def home(request):




    #posts = Blog.objects.all() # 블로그 객체를 모두 가져올 거다 
    #Blog.objects.all() # 블로그 객체들이 데이터베이스로부터 가져와 진다

    posts = Blog.objects.filter().order_by('date') # 날짜를 기준으로 정렬된 데이타. -data는 날짜 역순으로
    return render(request, 'index.html', {'posts':posts})  #posts 딕셔너리 형태로 index로 찍어 보내준다.





# Create your views here.

# 블로그 글 작성 html을 보여주는 함수
def new(request):
    return render(request, 'new.html')



#create는 블로그 글을 저장 해 주는 함수 
#submit 했을때 데이터베이스에 저장 되게 하는 함수

def create(request):

    if(request.method == "POST"): #request를 받아서 실행이 되는데 request 의 method 가 POST(내 데이터를 처리해 줘 라먄)
        post = Blog() # 블로그 객체 생성


        post.title = request.POST['title'] # post 의 타이틀에는 POST 요청에서 들어온 title

        post.body = request.POST['body']
        post.date = timezone.now()
        post.save()

    return redirect('home') #함수가 정상적으로 끝났으면은 home(index.html)로 다시 돌아가라

#django form을 이용해서 입력값을 받는 함수 

#GET 요청과 (= 입력값을 받을 수 있는 html을 갖다 줘야 함 )
#POST 요청 ( = 입력한 내용을 데이터베이스에 저장. form 에서 입력한 내용을 처리)
#둘 다 처리가 가능한 함수 

def formcreate(request):
    if (request.method == 'POST'):
        # 입력 내용을 DB에 저장 
        form = BlogForm(request.POST)
        
        if form.is_valid():
            post = Blog()
            post.title = form.cleaned_data['title']
            post.body = form.cleaned_data['body']
            post.save()
            return redirect('home')
        
       

    else:
        #입력을 받을 수 잇는 html을 갖다주기 
        form = BlogForm() #블로그 틀을 보여주기 위해

    return render(request, 'form_create.html', {'form':form} )




def modelformcreate(request):
   
    if (request.method == 'POST'):
        # 입력 내용을 DB에 저장 
        form = BlogForm(request.POST)
        
        if form.is_valid():
            form.save()

            return redirect('home')
        
       


    else:
        #입력을 받을 수 잇는 html을 갖다주기 
        form = BlogModelForm() #블로그 틀을 보여주기 위해

    return render(request, 'form_create.html', {'form':form} )

def detail(request, blog_id): # 
    #blog_id 번째 블로그 글을 데이터베이스로부터 갖고와서 
    # blog_id 번째 블로그 글을 detail.html로 띄워주는 코드

    blog_detail = get_object_or_404(Blog, pk=blog_id) #blog 객체 하나를 가져올건데 pk값이 blog_id인 블로그 객체 하나를 가져와라


    
    return render(request, 'detail.html', {'blog_detail':blog_detail})