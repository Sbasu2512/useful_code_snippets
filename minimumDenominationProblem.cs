public class HelloWorld
{
    public static void Main(string[] args)
    {
        int[] currency = new int[]{ 100, 50, 20, 10, 5, 1 };
        int[] noteCounter = new int[6];
     int amount = 1134;
        // count notes
        for (int i = 0; i < 6; i++) {
            if (amount >= currency[i]) {
                noteCounter[i] = amount / currency[i];
                amount = amount % currency[i];
            }
        }
     
        // Print notes
        Console.WriteLine("Currency Count ->");
        for (int i = 0; i < 6; i++) {
        Console.WriteLine(currency[i] + " : "
                    + noteCounter[i]);
        }
    }
}