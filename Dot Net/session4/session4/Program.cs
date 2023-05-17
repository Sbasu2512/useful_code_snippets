namespace session4;
class Employee
{
    public string? EmpName;
    //public string? Dept;
    public double salary;

    public double GetSalary()
    {
        return salary;
    }

    public static double GetHighestSalary(Employee[] arr)
    {
        double highestSal = arr[0].salary;
        for (int i = 0; i < arr.Length; i++)
        {
            if (highestSal < arr[i].salary)
            {
                highestSal = arr[i].salary;
            }
            //Console.WriteLine(highestSal);
        }
        return highestSal;
    }


    static void Main(string[] args)
    {
        Console.WriteLine("Hello, World!");
        //Employee x = new Employee();
        //x.EmpName = "Sayantan";
        //x.Dept = "IT";
        //x.salary = 40000;

        Employee[] arr = new Employee[5];

        arr[0] = new Employee();
        arr[1] = new Employee();
        arr[2] = new Employee();
        arr[3] = new Employee();
        arr[4] = new Employee();

        arr[0].EmpName = "Sayantan";
        //arr[0].Dept = "IT";
        arr[0].salary = 32000;
        //arr[0].EmpName = "Sayantan";
        arr[1].EmpName = "Abhishek";
        arr[1].salary = 30000;
        arr[2].EmpName = "Shaurya";
        arr[2].salary = 35000;
        arr[3].EmpName = "Falgun";
        arr[3].salary = 36000;
        arr[4].EmpName = "Dilip";
        arr[4].salary = 38000;



        Console.WriteLine(GetHighestSalary(arr));

        Console.ReadKey();
    }
}

