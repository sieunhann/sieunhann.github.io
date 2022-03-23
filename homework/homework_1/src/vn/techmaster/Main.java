package vn.techmaster;

import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        System.out.println("Câu 1: ");
        int a = 6;
        int b = 7;

        System.out.println("a + b = " + (a+b));
        System.out.println("a - b = " + (a-b));
        System.out.println("b - a = " + (b-a));
        System.out.println("a/b = " + ((double)a/b));
        System.out.println("b/a = " + ((double)b/a));

        System.out.println("\nCâu 2: ");
        System.out.println("1. Code mẫu: \n" +
                "        Scanner sc = new Scanner(System.in);\n" +
                "\n" +
                "        System.out.println(\"Nhập giá trị của c: \");\n" +
                "        int c = sc.nextInt();\n" +
                "        sc.nextLine();\n" +
                "        System.out.println(\"Giá trị của c là: \" + c);\n" +
                "        int j = c++;\n" +
                "        int q = c;\n" +
                "        System.out.println(\"Giá trị của j là: \" + j);\n" +
                "        System.out.println(\"Giá trị của q là: \" + q);\n" +
                "\n" +
                "        System.out.println(\"\\nNhập giá trị của d: \");\n" +
                "        int d = sc.nextInt();\n" +
                "        sc.close();\n" +
                "        System.out.println(\"Giá trị của d là: \" + d);\n" +
                "\n" +
                "        int k = ++d;\n" +
                "        int f = d;\n" +
                "        System.out.println(\"Giá trị của k là: \" + k);\n" +
                "        System.out.println(\"Giá trị của f là: \" + f);");


        System.out.println("\n3. Run code mẫu: ");
        Scanner sc = new Scanner(System.in);

        System.out.println("- Nhập giá trị của c: ");
        int c = sc.nextInt();
        sc.nextLine();
        System.out.println("+ Giá trị của c là: " + c);
        int j = c++;
        int q = c;
        System.out.println("+ Giá trị của j là: " + j);
        System.out.println("+ Giá trị của q là: " + q);

        System.out.println("\n- Nhập giá trị của d: ");
        int d = sc.nextInt();
        sc.close();
        System.out.println("+ Giá trị của d là: " + d);

        int k = ++d;
        int f = d;
        System.out.println("+ Giá trị của k là: " + k);
        System.out.println("+ Giá trị của f là: " + f);

        System.out.println("\n3. Phân tích kết quả: ");
        System.out.println(
                "- j có giá trị bằng giá trị của c\n" +
                        "- q có giá trị lớn hơn giá trị của c là 1\n" +
                        "=> c++ tăng giá trị của c lên 1 và giá trị trả về là giá trị ban đầu của c trước khi được tăng lên 1.\n");
        System.out.println(
                "- k có giá trị lớn hơn giá trị của d là 1\n" +
                        "- q có giá trị lớn hơn giá trị của d là 1\n" +
                        "=> ++d tăng giá trị của d lên 1 và trả về giá trị mới đó.");

        System.out.println("\n4. Kết luận: ");
        System.out.println("KL1: ++i tăng giá trị của i lên 1 và trả về giá trị mới đó.\n" +
                "KL2: i++ tăng giá trị của i lên 1 nhưng giá trị trả về là giá trị ban đầu của i trước khi được tăng lên 1.");
    }
}
