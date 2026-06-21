This Cover Page Maker is a smart and time-saving web application designed for Metropolitan University students. The system automatically generates a professional academic cover page by simplifying the entire process. Students only need to select their professor’s name from a dropdown menu, and the system will instantly auto-fill the corresponding subject name, course title, and course code using predefined data. After that, students simply enter their own information such as student name, student ID, and assignment title. The application then creates a clean, formatted, and ready-to-download cover page within seconds. This tool reduces manual mistakes, saves time, and ensures a consistent and professional presentation for assignments, lab reports, and project submissions.

.MODEL SMALL
.STACK 100H

.DATA 

    ; HARE YOU CAN DECLARE DIFFERENT VARIABLES.
 NUM1 DB 02     ; DB MEANS DEFINE BYTE 
 NUM2 DB 05 
 NUM3 DB 07       
.CODE 


MAIN PROC 

MOV AX, @DATA
MOV DS, AX
  
MOV AL, NUM1
MOV BL, NUM2
ADD AL, BL ;AL=AL+BL
ADD AL, NUM3  

MOV AL, NUM1
MOV BL, NUM2
ADD AL, BL ;AL=AL+BL
MOV BL, NUM3 
ADD AL, BL


MOV AL, NUM1
ADD AL, NUM2
ADD AL, NUM3
         
 MOV AH, 4CH ; this is searvice routine to end the code 
 INT 21H  ; this is intrepreter which is helping service routine to endup the code 
    MAIN ENDP
END MAIN 
