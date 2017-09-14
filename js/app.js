 let move=0,match=0,listopen=[],starttime,endtime;//variable storing moves and matches and list containing open cards start time and end time of game
 let timer=0;
 /*
 * Create a list that holds all of your cards and variable counting the moves
 */

let array=[];
array[0]='<li class="card"><i class="fa fa-paper-plane-o"></i></li>';
array[1]='<li class="card"><i class="fa fa-paper-plane-o"></i></li>';
array[2]='<li class="card"><i class="fa fa-anchor"></i></li>';
array[3]='<li class="card"><i class="fa fa-anchor"></i></li>';
array[4]='<li class="card"><i class="fa fa-cube"></i></li>';
array[5]='<li class="card"><i class="fa fa-cube"></i></li>';
array[6]='<li class="card"><i class="fa fa-leaf"></i></li>';
array[7]='<li class="card"><i class="fa fa-leaf"></i></li>';
array[8]='<li class="card"><i class="fa fa-diamond"></i></li>';
array[9]='<li class="card"><i class="fa fa-diamond"></i></li>';
array[10]='<li class="card"><i class="fa fa-bomb"></i></li>';
array[11]='<li class="card"><i class="fa fa-bomb"></i></li>';
array[12]='<li class="card"><i class="fa fa-bolt"></i></li>';
array[13]='<li class="card"><i class="fa fa-bolt"></i></li>';
array[14]='<li class="card"><i class="fa fa-bicycle"></i></li>';
array[15]='<li class="card"><i class="fa fa-bicycle"></i></li>';
//responsible for calling a modal box
let a='<div class="container boxopener"><h1><b>RITU RAJ\'s MEMORY GAME</b></h1><button type="button" class="btn btn-info btn-lg" id="myBtn">START THE GAME</button>';
//It creates a modal box and its structure when we click start the game
let b='<div class="modal fade boxshower" id="Modal" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title"><b>%heading%</b></h4></div><div class="modal-body"><p>%text%</p></div><div class="modal-footer"><button type="button" class="btn btn-default modalbutton" data-dismiss="modal" onClick="resetdeck()">%button%</button></div></div></div></div>';
//it creates a modal box and its structure when we win the game
let y='<div class="modal fade boxshower" id="xModal" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title a"></h4></div><div class="modal-body b"></div><div class="modal-footer"><button type="button" class="btn btn-default modalbutton c" data-dismiss="modal" onClick="resetdeck()"></button></div></div></div></div>';
start();//starts the game
function start()//called only one time during parsing or page refresh
{
    //replaces the modal box contents with what we require
    c=b.replace("%heading%","Please read");
    c=c.replace("%text%","The Deck of cards will be shown you\nfor few seconds keep it remembered You can also reset game \ndirectly by below reset button\nBEST OF LUCK");
    c=c.replace("%button%","Show me");
    //element responsible for calling modal box
    $('body').prepend(a);
    //It creates a modal box and its structure when we click start the game
    $('body').prepend(c);
    //it creates a modal box and its structure when we win the game
    $('body').prepend(y);
}

$(document).ready(function(){
    $("#myBtn").click(function(){
        //function calling modal box
        $("#Modal").modal();
    });
});


function resetdeck()//resets the whole deck initialise variables cards shuffles them
{
    // shuffle the list of cards using the provided "shuffle" method below
    //shuffle(array);//open show match nonmatch TO REMMOVE THIS linE
    $(".deck").html("");
    for (let i=0;i<array.length;++i)
        {
            $('.deck').prepend(array[i]);
        }
//showing and opening the cards
setTimeout(function(){ $('.card').addClass('open show');},1);
//closing the cards and calling the function responsible for game
//because of nesting of time out game will only be called when its nested time out is completed
setTimeout(function(){$('.card').removeClass('open show'); setTimeout(game,1); }, 1);
move=0;
match=0;
listopen=[];
while(document.getElementById("starid").childElementCount<5)//to bring back the stars when game is reset
    {
        $("#starid").prepend('<li><i class="fa fa-star"></i></li>');
    }
$('.moves').children().first().remove();//whatever is in move tag remove and initialise with 0 moves
$('.moves').prepend('<b>0 Moves</b>');
setTimeout(function()
    {
        //remove the contents we appended in the win modal box during win
        $('.a').children().first().remove();
        $('.b').children().first().remove();
        $('.c').children().first().remove();
    },1);
}

function shuffle(array) {//shuffles the deck
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0)
    {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

 function game()//starts the game
{
    starttime =new Date().getTime();//get the start time in milliseconds from the refrence date 1970
    timer=setInterval(function(){//start the timer
            // Get current time in milliseconds from the refrence date 1970
            let now = new Date().getTime();

            // Find the distance between now an the count down date
            var distance = now -starttime;

            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Output the result in an element with id="timerid"
            document.getElementById("timerid").innerHTML = "<b>"+ days + " Day " + hours + " Hr "
            + minutes + " Min " + seconds + " Sec "+"</b>";
        }, 1000);
    while(true)
    {
        let firstclickcard;//variable stroring the refrence of element opened in odd mpve before the even move which to be matched
        $('.card').click(function()
        {
            if(!($(this).attr("class")==='card show match'||$(this).attr("class")==='card open show'))//dont enter if card is already opened
            {
                if (move%2===0)//if move is odd move
                {
                    firstclickcard=$(this);//remembering deck element for odd click because it has to be compared with even clicks
                    console.log("abc",$(firstclickcard),$(this));
                    firstclick($(this));//call the function responsible for odd clicks
                }
                else//if move is even move
                {
                    console.log("def",$(firstclickcard),$(this));
                    matchingclick($(this),firstclickcard);//this to match the previous one
                }
            }
        });
    break;
    }
}
function firstclick(thisvariable)//odd click
{

    listopen[listopen.length]=$(thisvariable).children().attr('class');//adding the class of item to the list containing open itemsa at the end
    $(thisvariable).addClass('open show');//opening clicked and showing the card
    move+=1;
    console.log("okh",move);
    $('.moves').children().first().remove();//changing moves value dynamically
    $('.moves').prepend('<b>'+move+" Moves"+'</b>');
}
//START FROM HERE
function matchingclick(thisvariable,lastvariable)//even click
{
    let childrenclass=$(thisvariable).children().attr('class');//getting class of even clicked card
    if( listopen[listopen.length-1]===childrenclass)//if it matched with the last opened card in the list open both
    {
        $(lastvariable).removeClass('open');//removed blue color by open class
        $(lastvariable).addClass('match');//added green color in last clicked card
        $(thisvariable).addClass('show match');//added green color and showed the element
        match+=1;
    }
    else//if not matched with the last one close both
    {    //sets the synchorinization of the elements opening and closing
         setTimeout(function(){
         listopen.pop();//removing the card from open list
         //removed last card open(blue color),added nonmatch(red),added this time clicked show(show content) nonmatch(red color)
         $(lastvariable).removeClass('open'); $(lastvariable).addClass('nonmatch'); $(thisvariable).addClass('show nonmatch');
         setTimeout(function(){//wait for 250 millisecond and execute
         //removed show(show content)and nonmatch(red color)
         $(lastvariable).removeClass('show nonmatch'); $(thisvariable).removeClass('show nonmatch');},250);
         },1);
    }
    move+=1;
    $('.moves').children().first().remove();////changing moves value dynamically
    $('.moves').prepend('<b>'+move+" Moves"+'</b>');
    //remove stars as per moves
    if(move>=19 && move<=20)
            $('#starid').children().first().remove();
    else if (move>=21&& move<=22)
            $('#starid').children().first().remove();
    else if (move>=24 && move<=25)
            $('#starid').children().first().remove();
    else if (move>=30 && move<=31)
            $('#starid').children().first().remove();
    if(match==8)//if game completes
        {
            endtime=new Date().getTime();//having end time of game
            //giving content to win modal box
            $('.a').append("<b>YOU EARNED STARS ARE "+document.getElementById("starid").childElementCount+"</b>");
            $('.b').append("<p>YOU TOTAL MOVES ARE "+move+"\nTIME TAKEN BY YOU\n"+"IN SECONDS :=="+(endtime-starttime)/1000+"<br/>IN MINUTES :=="+
            ((endtime-starttime)/1000/60).toFixed(4)+ "</p>");
            $('.c').append("<b>Restart GAME</p>");
            stoptimer();//ffunction stopping timer
            //invoke win modal box
            $("#xModal").modal();
        }
}

function stoptimer()//stop timer
{
    setTimeout(function(){clearInterval(timer);},50);//stops the timer
}
