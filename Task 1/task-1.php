<?php
class UserEmail
{

    public $namewithEmail;
    function FirstName($first_name)
    {
        $this->namewithEmail = $first_name;
    }
    function LastName($last_name)
    {
        $this->namewithEmail .= " " . $last_name;
    }
    function Email($emailid)
    {
        $email = "< " . $emailid . " >";
        $this->namewithEmail .= " " . $email;
    }
    public function __toString()
    {
        return '"' . $this->namewithEmail . '"';
    }
}

$usersetEmail = new UserEmail();
$usersetEmail->FirstName("Apple");
$usersetEmail->LastName("Newton");
$usersetEmail->Email("apple@newton.com");

echo $usersetEmail;
