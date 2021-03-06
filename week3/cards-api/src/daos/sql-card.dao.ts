import { PoolClient } from 'pg';
import { connectionPool } from '../util/connection.util';
import { cardConverter } from '../util/card.converter';
import Card from '../models/card';


export async function findById(id: number) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect(); // basically .then is everything after this
        const queryString = `
        SELECT * FROM card
        LEFT JOIN app_user USING (user_id)
        INNER JOIN quality USING (quality_id)
        INNER JOIN game USING (game_id)
        WHERE card_id = $1`;
        const result = await client.query(queryString, [id]);
        // convert result from sql object to js object
        console.log(result.rows);
        return cardConverter(result.rows[0]);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}

export async function findAll() {
    let client: PoolClient;
    try {
        client = await connectionPool.connect(); // basically .then is everything after this
        const queryString = `
        SELECT * FROM card
        LEFT JOIN app_user USING (user_id)
        INNER JOIN quality USING (quality_id)
        INNER JOIN game USING (game_id)`;
        const result = await client.query(queryString);
        // convert result from sql object to js object
        return result.rows.map(cardConverter);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    console.log('found all');
    return undefined;
}

export async function findByGameId(gameId: number) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect(); // basically .then is everything after this
        const queryString = `
        SELECT * FROM card
        LEFT JOIN app_user USING (user_id)
        INNER JOIN quality USING (quality_id)
        INNER JOIN game USING (game_id)
        WHERE game_id = $1`;
        const result = await client.query(queryString, [gameId]);
        // convert result from sql object to js object
        return result.rows.map(cardConverter);
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    console.log('found all');
    return undefined;
}


export async function save(card: Card) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect(); // basically .then is everything after this
        const queryString = `
            INSERT INTO card (card_name, card_value, game_id, quality_id, user_id)
            VALUES 	($1, $2, $3, $4, $5)
            RETURNING card_id
        `;
        const params = [card.name, card.value, card.game && card.game.id, card.quality && card.quality.id, card.owner && card.owner.id];
        const result = await client.query(queryString, params);
        return result.rows[0].card_id;
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}


export async function update(card: Partial<Card>) {
    const oldCard = await findById(card.id);
    if (!oldCard) {
        return undefined;
    }
    card = {
        ...oldCard,
        ...card
    };
    let client: PoolClient;
    try {
        client = await connectionPool.connect(); // basically .then is everything after this
        const queryString = `
            UPDATE card SET card_id = $1, card_name = $2, card_value = $3, game_id = $4,
                user_id = $5, quality_id = $6
            WHERE card.card_id = $7
            RETURNING *
        `;
        const params = [card.id, card.name, card.value, card.game && card.game.id, card.owner && card.owner.id, card.quality && card.quality.id, card.id];
        await client.query(queryString, params);
        const updatedCard = await findById(card.id);
        return updatedCard;
    } catch (err) {
        console.log(err);
    } finally {
        client && client.release();
    }
    return undefined;
}
