namespace session5;
class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("Hello, World!");
        School school = new School();
        for(int i=1; i< school.GetLength(); i++)
        {
            Console.WriteLine(school[i]);
        }

        Console.ReadKey();
    }
}

class Student
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Course { get; set; }

    public string GetResult()
    {
        return $"Id: {this.Id}, Name: {this.Name}, Course: {this.Course}";
    }

    public override string ToString()
    {
        return $"Id: {this.Id}, Name: {this.Name}, Course: {this.Course}";
    }


}


class School
{
    List<Student> studentList;

    public School()
    {
        this.studentList = new List<Student>
            {
                new Student { Id = 1, Name = "Alice", Course = "Physics" },
                new Student { Id = 2, Name = "Bob", Course = "Mathematics" },
                new Student { Id = 3, Name = "Charlie", Course = "Computer Science" },
                new Student { Id = 4, Name = "David", Course = "Biology" },
                new Student { Id = 5, Name = "Eve", Course = "Computer Science" },
                new Student { Id = 6, Name = "Frank", Course = "English" },
                new Student { Id = 7, Name = "Grace", Course = "Biology" },
                new Student { Id = 8, Name = "Alice", Course = "Mathematics" },
                new Student { Id = 9, Name = "Ian", Course = "Physics" },
                new Student { Id = 10, Name = "Julia", Course = "Physics" }
            };

    }

    public int GetLength()
    {
        return this.studentList.Count;
    }

    public Student GetStudent(int Id)
    {
        return this.studentList.Find(x => x.Id == Id);
    }

    public Student this[int Id]
    {
        get
        {
            return this.studentList.Find(x => x.Id == Id);
        }

        set
        {
            Student s = this.studentList.Find(x => x.Id == Id);
            if (s != null)
            {
                s.Id = value.Id;
                s.Name = value.Name;
                s.Course = value.Course;
            }
        }
    }

    public Student this[string name]
    {
        get
        {
            return this.studentList.Find(x => x.Name == name);
        }

        set
        {
            Student s = this.studentList.Find(x => x.Name == name);
            if (s != null)
            {
                s.Id = value.Id;
                s.Name = value.Name;
                s.Course = value.Course;
            }
        }
    }

    public Student this[string name, string course]
    {
        get
        {
            return this.studentList.Find(x => x.Name == name && x.Course == course);
        }
    }
}
