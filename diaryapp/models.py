from django.db import models

class Blog(models.Model): #블로그 객체
    title = models.CharField(max_length = 200) #title 글자 수 제한 
    body = models.TextField()

    date = models.DateTimeField(auto_now_add =True) # 자동으로 지금 시간을 추가 

    def __str__(self):
        return self.title


# 데이터베이스에 변경 사항 생겼으니 까 migragte