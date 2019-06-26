package com.revature.e.arrays;

import java.util.Arrays;

import com.revature.d.objects.Animal;
import com.revature.d.objects.Dog;


public class ArraysDriver {
	public static void main(String[] args) {
		int[] numbers = new int[10];
		numbers[0] = 13;
		numbers[1] = 53;

		numbers[8] = 105;
//		numbers[10] = 25; // this code will throw an exception and cause our app to crash

		for (int i = 0; i < numbers.length; i++) {
			System.out.println("numbers at index: " + i + " = " + numbers[i]);
		}
		System.out.println(Arrays.toString(numbers));

		if (numbers.length > 5000) {
			System.out.println(numbers[5000]);
		} else {
			System.out.println("this array has no element at index 5000");
		}

		Animal[] myPets = new Animal[3];
		myPets[0] = new Dog("Rocky", true, "boxer? mix?", "long", "medium");
		myPets[1] = new Dog("Drew", true, "chiuaua mix", "short", "small");
		myPets[2] = new Dog("Haze", true, "chiuaua mix", "short", "small");
		System.out.println(Arrays.toString(myPets));
		
		testTrace();
	}
	
	public static void testTrace() {
		Animal[] myPets = new Animal[3];
		myPets[0] = new Dog("Rocky", true, "boxer? mix?", "long", "medium");
		myPets[1] = new Dog("Drew", true, "chiuaua mix", "short", "small");
		myPets[2] = new Dog("Haze", true, "chiuaua mix", "short", "small");
		System.out.println(Arrays.toString(myPets));
		
		myPets[25] = null;
	}
}
