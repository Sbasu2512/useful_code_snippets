using System;

public class HelloWorld
{
    private int randomizer(int min, int max)
    {
        Random x = new Random();
        return x.Next(min, max);
    }
     static void Main(string[] args, HelloWorld helloWorld)
    {
        string[] names = { "Sudipto", "Sayantan", "Avijit", "Piyali", "Moumita" };
        //select a random winner -- index
        int randomIndex = helloWorld.randomizer(0, names.Length);
        System.Console.WriteLine(names[randomIndex]);

        //select 3 distinct winners
        string[] winners = new string[3];
        string randomWinner1 = names[helloWorld.randomizer(0, names.Length)];
        winners[0] = randomWinner1;
        string randomWinner2 = names[helloWorld.randomizer(0, names.Length - 1)];
        for (int i = 0; i < names.Length; i++)
        {
            if (!names[i].Contains(randomWinner2))
            {
                names[1] = randomWinner2;
                break;
            }
            else
            {
                randomWinner2 = names[helloWorld.randomizer(0, names.Length - 1)];
            }
        }
        string randomWinner3 = names[helloWorld.randomizer(0, names.Length - 2)];
        for (int i = 0; i < names.Length; i++)
        {
            if (!names[i].Contains(randomWinner3))
            {
                names[2] = randomWinner3;
                break;
            }
            else
            {
                randomWinner3 = names[helloWorld.randomizer(0, names.Length - 2)];
            }
        }
    }
}