#!/bin/bash

# Black       0;30     Dark Gray     1;30
# Blue        0;34     Light Blue    1;34
# Green       0;32     Light Green   1;32
# Cyan        0;36     Light Cyan    1;36
# Red         0;31     Light Red     1;31
# Purple      0;35     Light Purple  1;35
# Brown       0;33     Yellow        1;33
# Light Gray  0;37     White         1;37

declare -A menu

#******************************************************
#  config section
#******************************************************

menu["1"]="Home"
menu["2"]="Downloads"
menu["3"]="Documents"
menu["4"]="Musics"
menu["5"]="Pictures"
menu["t"]="Open current dir in file manager"
menu["q|0"]="Quit"


menuOrder=("1" "2" "3" "4" "5" "t" "q|0")

function doCommand(){
  case $1 in
    1)
        cd $HOME
    ;;
    2)
        cd $HOME/Downloads
    ;;
    3)
        cd $HOME/Documents
    ;;
    4)
        cd $HOME/Musics
    ;;
    5)
        cd $HOME/Pictures
    ;;
    t)
        nautilus . &
    ;;
    q|0)
        break;
    ;;
    *)
        echo "Unknown option"
        run
    ;;

  esac
}

#******************************************************
# config section end 
#******************************************************

columnWidth=$(tput cols)

function doResetColor(){
  echo -en "\033[0m"
}

function stringRepeat(){
  local string=$1
  local multiplier=$2
  local i
  
  for (( i=1; i<= $multiplier; i++ ))
  do
    echo -en "$string"
  done
}

function stringFit(){
  local string=$2
  local start=$1
  local end=$3
  local maxLen=$4
  local strLen=${#string}

  local repeat=$(($maxLen - ${#string} - ${#start} - ${#end}))
  local space=$(stringRepeat "." $repeat)
  echo "${start}${string}${space}${end}"
}

function printMenu(){

 echo -en "\u250f$(stringRepeat "\u2501" $(($columnWidth - 2)))\u2513\n"

 echo -en "$(stringFit "\u2503" "\033[0;34m What would you like to do?\033[0m" "\u2503" $(($columnWidth + 27)))\n"
 
 echo -en "\u2503$(stringRepeat "\u2500" $((columnWidth - 2)) )\u2503\n"

 for key in "${menuOrder[@]}"
 do
   echo  -en "$(stringFit "\u2503" " \033[1m${key}) \033[1;37;40m${menu[$key]}\033[0m" "\u2503" $((columnWidth + 37))  )\n"
 done

 echo -en "\u2516$(stringRepeat "\u2501" $(($columnWidth - 2)) )\u251a\n"
}

function run(){
  while true
  do
    read -s -n 1 choice
    doCommand $choice
    break
  done
}

#save current screen
tput smcup

printMenu
run
doResetColor

#restore screen
tput rmcup

tput cuu 1 && tput el