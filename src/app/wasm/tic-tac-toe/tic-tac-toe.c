#include <math.h>
#include<stdio.h>
#include <emscripten.h>

int  board[3][3];

EMSCRIPTEN_KEEPALIVE
int initiate(){
    for (int i=0; i<3; i++){
        for (int j=0; j<3; j++){
            board[i][j] = -1;
        }
    }
    return -1;
}

EMSCRIPTEN_KEEPALIVE
int int_sqrt(int x) {
  return sqrt(x);
}


EMSCRIPTEN_KEEPALIVE
int rowCrossed(int pos, int player)
{
   
    if (board[pos/3][0] == board[pos/3][1] &&
        board[pos/3][1] == board[pos/3][2] && 
        board[pos/3][0] == player){

        return 1;
        }
    return 0;
}

EMSCRIPTEN_KEEPALIVE
int columnCrossed(int pos, int player )
{
  
    if (board[0][pos%3] == board[1][pos%3] &&
        board[1][pos%3] == board[2][pos%3] && 
        board[0][pos%3] == player){

        return 1;
        }
    return 0;
}

EMSCRIPTEN_KEEPALIVE
int diagonalCrossed(int pos, int player)
{
    if (board[0][0] == board[1][1] &&
        board[1][1] == board[2][2] && 
        board[0][0] == player)
        {
        return 1 ;
        }
          
    if (board[0][2] == board[1][1] &&
        board[1][1] == board[2][0] &&
         board[0][2] == player)
         {

        return 1;
         }
  
    return 0;
}

EMSCRIPTEN_KEEPALIVE
int move(int pos, int player){
	if(board[pos/3][pos%3] != -1){
		return -1;
	}
	
	board[pos/3][pos%3] = player;
	return rowCrossed(pos , player) || columnCrossed(pos , player) || diagonalCrossed( pos , player);
	
}
