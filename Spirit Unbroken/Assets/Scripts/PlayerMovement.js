#pragma strict

	public var jumpHeight = 0; //Maak een nieuwe variabele aan met de naam Jumpheight.
	//Deze is public zodat ik die in de inspector kan aanpassen
	public var maxJumps = 0; //Maximale hoeveelheid aan jumps
	private var doubleJump = 0; //Hoeveelheid jumps die er om dat moment zijn (deze mogen er 
	//maar 2 zijn voor een doublejump. 
	//Deze is private omdat deze niet aangepast mag worden door iedereen.
	
	private var facingRight = true;
	public var moveSpeed = 0; //Snelheid waarmee het object beweegt.
	
function Start () { //Wanneer het object/character aangemaakt is

}

function Update () { //Wordt elke fram aangeroepen
	var x;
	var y;

	if (Input.GetKeyDown(KeyCode.Space) && CanJump()) //Pak input van wanneer er op iets gedrukt wordt en deze moet space zijn.
	//Vervolgens kijk je of er gesprongen mag worden via de functie CanJump. Returnt deze true dan ja anders false (nee)
	{
		x = GetComponent(Rigidbody2D).velocity.x;
		GetComponent(Rigidbody2D).velocity = new Vector2(x,jumpHeight); //Ik pak de Rigidbody van dit object
		//en daarvan de snelheid waarmee het beweegt, maak een nieuwe vector aan elke keer dat
		//er op space gedrukt wordt en tel bij de "y" van dit object de jumpheight op die in de inspector
		//is aangegeven.
		doubleJump ++; //Er wordt 1 bij opgeteld
	}
	
	if (Input.GetKey(KeyCode.LeftArrow))
	{
		y = GetComponent(Rigidbody2D).velocity.y;
		
		GetComponent(Rigidbody2D).velocity = new Vector2(-moveSpeed, y);
		if(facingRight)
		{
			Flip();
		}
	}
	
	if (Input.GetKey(KeyCode.RightArrow))
	{
		y = GetComponent(Rigidbody2D).velocity.y;
		
		GetComponent(Rigidbody2D).velocity = new Vector2(moveSpeed, y);
		if(!facingRight)
		{
			Flip();
		}
	}
}

function OnCollisionEnter2D (coll : Collision2D)
{
	if(coll.gameObject.CompareTag("Ground")) // Wanneer dit object in aanraking komt met een ander
	//gameobject met de tag "Ground"
	{
		doubleJump = 0; // Wordt de hoeveeleid aan jumps gereset.
	}
}

function CanJump() 	//Mag het object opnieuw springen?
{
	return doubleJump < maxJumps; //Returns een true (ja) or false (nee)
}

function Flip ()
{
	var flipScale;
	
	facingRight = !facingRight; 
	flipScale = transform.localScale;	//Rotatie van object wordt aangepast
	transform.localScale = new Vector3(transform.localScale.x *-1, transform.localScale.y, transform.localScale.z);
	transform.localScale = flipScale;	
}