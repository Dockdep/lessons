<?php
try{
    function __autoload($classname){
        if(!file_exists( $classname.'.php')){
            throw new Exception("Can't find file { $classname.'.php'}.");
        } else {
            require_once( $classname.'.php' );
        }

    }

    $animal = new Cat();
    $animal->getVoice();

} catch ( Exception $e){
    print $e->getMessage();
}

