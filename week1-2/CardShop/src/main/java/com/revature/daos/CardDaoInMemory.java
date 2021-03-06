package com.revature.daos;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

import com.revature.models.Card;

public class CardDaoInMemory implements CardDao {

	private List<Card> cards;

	public CardDaoInMemory() {
		cards = new LinkedList<>();
		cards.add(new Card("Blue Eyes White Dragon", 10, "Yugioh", "Dragon with blue eyes", "Mint"));
		cards.add(new Card("Island", 0.15, "MTG", "Land", "Used"));
		cards.add(new Card("Pikachu", 0.50, "Pokemon", "Monster", "Mint"));
		cards.add(new Card("Charmander", 0.8, "Pokemon", "Fire Monster", "Used"));
	}

	@Override
	public void save(Card c) {
		cards.add(c);
	}

	@Override
	public void remove(Card c) {
		cards.remove(c);
	}

	@Override
	public List<Card> findAll() {
		return cards;
	}

	@Override
	public List<Card> findByGame(String game) {
		List<Card> filteredList = new ArrayList<>();
		for (Card c : cards) {
			if (c.getGame().equalsIgnoreCase(game)) {
				filteredList.add(c);
			}
		}
		return filteredList;
	}

	@Override
	public List<Card> findByValue(double minimum, double maximum) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Card> findByNameContains(String name) {
		// TODO Auto-generated method stub
		return null;
	}

}
