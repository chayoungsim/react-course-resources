import fs from "node:fs";

import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

export async function getMeals() {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
    return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal) {
    meal.slug = slugify(meal.title, { lower: true });
    meal.instructions = xss(meal.instructions);

    const extension = meal.image.name.split(".").pop();
    const fileName = `${meal.slug}.${extension}`;

    const stream = fs.createWriteStream(`./public/images/${fileName}`);
    const bufferedImage = await meal.image.arrayBuffer();

    await new Promise((resolve, reject) => {
        stream.write(Buffer.from(bufferedImage), (error) => {
            if (error) {
                reject(new Error("Saving image failed!"));
            } else {
                resolve();
            }
        });
    });

    meal.image = `/images/${fileName}`;

    db.prepare(
        `
        INSERT INTO meals
        (title, summary, instructions, creator, creator_email, image, slug)
        VALUES(            
            @title,           
            @summary,
            @instructions,
            @creator,
            @creator_email,
            @image,            
            @slug
        )
    `,
    ).run(meal);
}
