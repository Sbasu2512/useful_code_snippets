public class HelloWorld
{
    public static void Main(string[] args)
    {
        int givenNumberInSeconds = 56778;
       int  hours, minutes, seconds;

	hours = (givenNumberInSeconds/3600); 
	
	minutes = (givenNumberInSeconds -(3600*hours))/60;
	
	seconds = (givenNumberInSeconds -(3600*hours)-(minutes*60));
        System.Console.WriteLine($"{hours}:{minutes}:{seconds}");
  
    }
}