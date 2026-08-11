CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(120) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'farmer',
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_email ON users(email);

ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(20) NOT NULL DEFAULT 'farmer';

CREATE TABLE crops (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    season VARCHAR(50) NOT NULL,
    soil VARCHAR(100) NOT NULL,
    water_requirement VARCHAR(50) NOT NULL,
    temperature VARCHAR(50) NOT NULL,
    fertilizer VARCHAR(150) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_crops_name ON crops(name);

CREATE TABLE tools (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    price VARCHAR(50) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE community_posts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    message TEXT NOT NULL,
    image_url VARCHAR(500),
    likes_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_community_posts_user ON community_posts(user_id);
CREATE INDEX idx_community_posts_created ON community_posts(created_at DESC);

CREATE TABLE post_likes (
    id SERIAL PRIMARY KEY,
    post_id INTEGER NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE(post_id, user_id)
);

CREATE TABLE post_comments (
    id SERIAL PRIMARY KEY,
    post_id INTEGER NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    comment TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_post_comments_post ON post_comments(post_id);

CREATE TABLE contact_messages (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'new',
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_contact_messages_status ON contact_messages(status);

CREATE TABLE saved_crops (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    crop_id INTEGER NOT NULL REFERENCES crops(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, crop_id)
);

CREATE TABLE ai_chat_history (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    message TEXT NOT NULL,
    reply TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_ai_chat_history_user ON ai_chat_history(user_id);

CREATE TABLE newsletter_subscribers (
    id SERIAL PRIMARY KEY,
    email VARCHAR(120) UNIQUE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO crops (name, season, soil, water_requirement, temperature, fertilizer) VALUES
('Wheat', 'Rabi', 'Loamy Soil', 'Medium', '10°C - 25°C', 'NPK + Urea'),
('Rice', 'Kharif', 'Clay Soil', 'High', '20°C - 35°C', 'Nitrogen Rich Fertilizer'),
('Maize', 'Kharif', 'Well Drained Soil', 'Medium', '18°C - 27°C', 'NPK 20-20-20'),
('Cotton', 'Kharif', 'Black Soil', 'Medium', '21°C - 30°C', 'Potassium + Nitrogen'),
('Sugarcane', 'Annual', 'Loamy Soil', 'High', '20°C - 32°C', 'Organic Compost + NPK');

INSERT INTO tools (name, price, category, description) VALUES
('Smart Tractor', '₹8,50,000', 'Heavy Machinery', 'Multi-purpose tractor for ploughing, sowing and harvesting.'),
('Water Sprinkler', '₹12,000', 'Irrigation', 'Portable sprinkler system for even field coverage.'),
('Harvest Machine', '₹5,40,000', 'Heavy Machinery', 'Combine harvester for wheat and rice fields.'),
('Irrigation System', '₹25,000', 'Irrigation', 'Drip irrigation kit for water-efficient farming.');

UPDATE users SET role = 'admin' WHERE phone = 'REPLACE_WITH_YOUR_PHONE_NUMBER';
