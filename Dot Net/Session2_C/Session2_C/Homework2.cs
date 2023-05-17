namespace Session2_C;
class Program
{
    static void Main(string[] args)
    {
        //Console.WriteLine("Hello, World!");
        string[] weekDays = { "Sun", "Mon", "Tues", "Wed", "Thrus", "Fri", "Sat" };
        Console.Write("When do you want the leave?");
        string userInput = Console.ReadLine();
        int startDayIndex, endDayIndex;
        string startDay, endDay;
        Console.Write("How many days:");
        int numberDays = Convert.ToInt32(Console.ReadLine());
        //Console.ReadKey();
        if (userInput == null)
        {
            throw new ArgumentException("Please enter a day");
        }
        for(int i=0; i<weekDays.Length; i++)
        {
            if(userInput.ToLower() == weekDays[i].ToLower())
            {
                startDayIndex = i;
                endDayIndex = startDayIndex + numberDays;
                //Console.WriteLine(endDayIndex);
                if(endDayIndex != null)
                {
                    endDay = weekDays[(endDayIndex % 7)-1];
                    
                    if(endDay.ToLower() == "sun" || endDay.ToLower() == "sat")
                    {
                        endDay = "Mon";
                    }
                    Console.WriteLine($"you will join back on {endDay}");
                }
                break;
            }

        }
        Console.ReadKey();
    }
}

