#장고에서 기본적으로 제공하는 form 기능

from django import forms

from .models import Blog #models.py에 있는 블로그를 기반으로 form 안에 생성


class BlogForm(forms.Form):
    #내가 입력받고자 하는 값들
    
    title = forms.CharField() #form 으로 부터 Char 형식으로 title을 입력 받겠다.
    body = forms.CharField(widget=forms.Textarea) #widget ~ 는 더 많은 텍스트 저장 가능 

    
class BlogModelForm(forms.ModelForm):
    class Meta:
        model = Blog
        #fields = '__all__' # 블로그 객체 안에 있는 title, body,data 가 전부 form의 대상이 됨

        fields = ['title', 'body']