from django.shortcuts import render

# Create your views here.
def home(request):
    if request.method == "Post":
        name=request.Post.get('name')
    email=request.Post.get('email')
    gender=request.post.get('gender')
    skills=request.Post.getlist('skills')
    image=request.FILES['image']
    print(name)
    print(email)
    print(age)
    print(gender)
    print(skills)
    print('file Name:', image.name)
    print('file Name:', image.size)
    print('content type:', image.content_type)

    return render(request,'form.html')