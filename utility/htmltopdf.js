const htmlPdf = require('html-pdf-node');

const receipt = async(ref,amount,title)=>{



    const file = {content:`<!DOCTYPE html>
<html lang="en">
<head>

<meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
                <style>
                    body{
                        background-color: brown;
                        display:flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;


                    }
                    .main{
                        width:450px;
                        height: 600px;
                        border-radius: 35px;
                        display: flex;

                    }

                    .antinque{
                        width: 100%;
                        height: 170%;
                        border-radius: 35px;
                    }
                    .title{
                        width: 100%;
                        height: 15%;
                        /* background-color: green; */
                        display: flex;
                        align-items: center;

                    }
                    .green{
                        display: flex;
                               /* width: 100%; */
                                       margin: auto;
                                   }
                                   .text{
                                       width: 100%;
                                       height: 100%;
                                       border-top-right-radius: 35px;
                                       border-top-left-radius: 35px;
                                   }

                                   .title-box{
                                    display: flex;
                                    justify-content: space-around;
                                    /* align-items: center; */
                                    width: 70%;
                                    position: absolute;
                                    margin-left: 70px;
                                    /* border: 1px solid black; */
                                }
                                .last{
                                    width:100%;
                                    border-bottom-left-radius: 35px;
                                    border-bottom-right-radius: 35px;
                                }
                                .body{
                                    width: 100%;
                                    height: 72%;
                                    display: flex;
                                    flex-direction: column;
                                    align-items: center;
                                }
                                .code{
                                    width: 100%;
                                }
                                .name-logo{
                                    display: flex;
                                    margin-top: 4px;
                                    margin-bottom: 18px;
                                    width: 100%;
                                    justify-content: space-around;
                                    /* background-color: red; */
                                    font-size: larger;
                                }
                                .phone-gender{
                                    display: flex;
                                    margin-top: 4px;
                                    width: 100%;
                                    justify-content: space-around;
                                    /* background-color: red; */
                                }
            
                                .form{
                                    position:absolute;
                                    /* margin-top: 0; */
                                    height: 100%;
                                    width: 57%;
                                    /* border: 2px solid black; */
                                }
                                .star{
                                    margin-left: px;
                                }
                                .date-ticket{
                                    display:flex;
                                    margin-top: 1px;
                                    width:100%;
                                    justify-content: space-evenly;
                                }
                                .arrange{
                                    display:flex;
                                    align-items:center;
                                    margin-top:12px;
                                    flex-direction:column;
                                    margin-left:3px;
                                }
                            </style>
                        </head>
                        <body>
                        <div class="main">
                       
                        <div class="form">
    
                            <div class="title">
                               
                                <div class="title-box">
                                    <img class="green" src="http://127.0.0.1:4000/Purple_website.svg.png" alt=>
                                    </div>
                            </div>
                            <div class="body">
                                <div class="name-logo">
                                    <img src="http://127.0.0.1:4000/prowanlogo.png" alt="">
                                    <div>
                                        <span>Name of Antendee:</span>
                                        <p>${ref}</p>
                                        </div>
                                    </div>
                                    <div class="phone-gender">
                                        <div>
                                            <span>PHONE NO:</span>
        
                                        <p>${amount}</p>
                                        </div>
                                        <div>
                                            <span>GENDER:</span>       
                                            </div>
                                            <div class="arrange">
                                                <span>TYPE:</span>
                                            <p>${title}</p>
                                            </div>
                                            <div class="arrange">
                                                <span>TICKET NUMBER:</span>
                                            <p>cdnumber</p>
                                            </div>
                                        </div>
                                        <div class="date-ticket">
                                        <div class="arrange">
                                        <span>LOCATION:</span>
                                        <p>
                                            Abuja Continental Hotel Football Pitch
                                        </p>
                                        <p>
                                        (Former Sheraton Hotel Abuja)
                                        </p>
                                        </div>
                                        </div>
                                        <div class="bottom">
                             
                                    </div>
                                </div>
            
                                </div>
            
                        </body>              
</html>

`}

const options = {format:'A4',path:`./uploads/card/${ref}.pdf`}


htmlPdf.generatePdf(file,options).then(()=>{

})

}

module.exports = {receipt};
