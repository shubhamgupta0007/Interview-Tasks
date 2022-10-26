<?php
abstract class CarDetails
{

    protected $isBroken;

    public function __construct($isBroken)
    {
        $this->isBroken = $isBroken;
    }

    public function isBroken()
    {
        $getType = get_class($this);
        if ($getType == "Door") {
            if ($this->isBroken) {
                echo $getType . " is broken <br>";
            } else {
                echo $getType . " is not broken <br>";
            }
        } else if ($getType == "Tyre") {
            if ($this->isBroken) {
                echo $getType . " is puncher <br>";
            } else {
                echo $getType . " is not puncher <br>";
            }
        } else if ($getType == "Paint") {
            if ($this->isBroken) {
                echo $getType . " is scratched <br>";
            } else {
                echo $getType . " is not scratched <br>";
            }
        } else {
            echo  "";
        }
    }
}


class Door extends CarDetails
{
}

class Tyre extends CarDetails
{
}

class Paint extends CarDetails
{
}

class Car
{

    protected $carData;

    public function __construct($carData)
    {
        $this->carData = $carData;
    }

    public function getdetails()
    {
        foreach ($this->carData as $carData) {
            $carData->isBroken();
        }
    }
}

$car = new Car([new Door(true), new Tyre(true), new Paint(true)]);

$car->getdetails();
