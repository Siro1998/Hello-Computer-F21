# wk4!!！
## What I did!
For this week, I continued on last week's cyborg bot and add some fulfillment to it. 
Last week, user could only place order on a new body part, but in this version, Sybo assistant can give different responses when user want to do other actions, like return or repair.
I used Firebase tool and javascript to add fulfillment and logic to the dialog. 

## Difficulties
### EACCES Permission error
My EACCES permission was denied when I tried to install the Firebase tool through npm. 
It's turns out that my current user don't have permission to access the file, I need to access it as a root, or reinstall node.js and npm.
> <img width="570" alt="Screen Shot 2021-09-30 at 10 08 05 AM" src="https://user-images.githubusercontent.com/43830622/135507369-6b1252e4-5cdb-4bd5-9c7a-92b39da72069.png">
> <img width="608" alt="Screen Shot 2021-09-30 at 10 08 41 AM" src="https://user-images.githubusercontent.com/43830622/135507373-ef7997a0-8a6b-4819-99cc-876ccb8909e4.png">

I reinstalled my node.js and npm through nvm. 
> <img width="568" alt="Screen Shot 2021-09-30 at 10 09 36 AM" src="https://user-images.githubusercontent.com/43830622/135507376-d44c8f14-4e9d-4f38-a2ab-10d37ec97a90.png">

After that, firebase was installed successfully, and I logged in to my account.
> <img width="413" alt="Screen Shot 2021-09-30 at 10 11 08 AM" src="https://user-images.githubusercontent.com/43830622/135507463-5f55835d-9ad4-4600-903f-5b9d095e1b17.png">

> <img width="372" alt="Screen Shot 2021-09-30 at 10 11 27 AM" src="https://user-images.githubusercontent.com/43830622/135507469-e178638a-d53a-4947-9f6a-785089b0f707.png">

### conv.data
Another difficulty is that when I tried to pass my action parameter to a follow-up intent, it did not pass data. 
I used the conv.data function we learned in class,but on my test, the conv.data part content was always shown as undefined.
> <img width="341" alt="Screen Shot 2021-09-30 at 1 01 36 PM" src="https://user-images.githubusercontent.com/43830622/135507502-57b99369-efd0-4453-a23b-b85ed8d5e453.png">

> <img width="591" alt="Screen Shot 2021-09-30 at 12 52 18 PM" src="https://user-images.githubusercontent.com/43830622/135507500-0841ca1e-7525-47ec-93ab-cdb9ad7a2d21.png">

So I created a variable called actionChoice, and let it equal to the params.action in the actionSelect intent.
And problem solved. I'm not sure why conv.data did't work, but i think create a variable is a easier way to store parameter data.
<img width="427" alt="Screen Shot 2021-09-30 at 1 34 23 PM" src="https://user-images.githubusercontent.com/43830622/135507508-f9b81fa0-43f4-4ad7-901c-244c945f7c83.png">

## Result
Here is a screenshot of my javascript code, and I deploy it successfully on firebase.
> <img width="857" alt="Screen Shot 2021-09-30 at 1 59 51 PM" src="https://user-images.githubusercontent.com/43830622/135507531-37385865-a81c-41b4-8796-7e7fcf6fceb1.png">
> <img width="566" alt="Screen Shot 2021-09-30 at 1 59 22 PM" src="https://user-images.githubusercontent.com/43830622/135507535-b4e28527-7768-4725-8f3b-15083cfe5698.png">

## Demo

https://user-images.githubusercontent.com/43830622/135507575-49ce2c85-2560-491a-9b47-2e57e44ab489.mov


