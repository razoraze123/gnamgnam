-- Gnam Gnam Bouillie Database Schema
-- Run this in your Supabase SQL Editor

-- Products table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom VARCHAR(255) NOT NULL,
  prix INTEGER NOT NULL,
  description TEXT,
  categorie_age VARCHAR(50),
  image_url TEXT,
  stock_disponible INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom VARCHAR(255) NOT NULL,
  note INTEGER CHECK (note >= 1 AND note <= 5),
  commentaire TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Allow public read on products" ON products
  FOR SELECT USING (true);

CREATE POLICY "Allow public read on reviews" ON reviews
  FOR SELECT USING (true);

-- Seed sample products
INSERT INTO products (nom, prix, description, categorie_age, image_url, stock_disponible) VALUES
('Spécial Épicé - Bouillie Mil & Banane par Gnam Gnam bouillie spécial épicé', 2500, 'Délicieuse bouillie de mil enrichie à la banane mûre. Texture onctueuse et goût naturellement sucré, parfaite pour le petit-déjeuner de bébé.', 'Dès 6 mois', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400', 25),
('Spécial Céréales - Bouillie Maïs & Arachide par Gnam Gnam bouillie Spécial Céréales', 2800, 'Mélange nutritif de maïs et d''arachide grillée. Riche en protéines végétales pour une croissance optimale.', 'Dès 8 mois', 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400', 18),
('Spécial Mil - Bouillie Soja Premium par Gnam Gnam bouillie spécial Mil', 3200, 'Notre formule premium au soja, enrichie en vitamines et minéraux. Idéale pour les bébés en pleine croissance.', 'Dès 6 mois', 'https://images.unsplash.com/photo-1495521939206-a217db9df264?w=400', 12),
('Bouillie Multi-Céréales', 3500, 'Mélange équilibré de mil, maïs et sorgho. Formule complète pour les enfants actifs.', 'Dès 12 mois', 'https://images.unsplash.com/photo-1464454709131-ffd692591ee5?w=400', 30),
('Bouillie Moringa Bio', 3800, 'Enrichie au moringa, super-aliment local reconnu pour ses vertus nutritionnelles exceptionnelles.', 'Dès 8 mois', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400', 8),
('Bouillie Fruits du Sahel', 2900, 'Aux fruits locaux du Sahel : tamarin, dattes et baobab. Un goût unique et authentique.', 'Dès 6 mois', 'https://images.unsplash.com/photo-1490885578174-acda8905c2c6?w=400', 3);

-- Seed sample reviews
INSERT INTO reviews (nom, note, commentaire) VALUES
('Aïssatou D.', 5, 'Mon bébé adore la bouillie Mil & Banane ! Il finit toujours son bol. Je recommande vivement !'),
('Moussa K.', 5, 'Excellente qualité. On sent vraiment que c''est fait avec des ingrédients naturels. Mes jumeaux en raffolent.'),
('Fatima O.', 4, 'Très bon produit. La texture est parfaite pour mon fils de 7 mois. Livraison rapide en plus !'),
('Ibrahim S.', 5, 'La bouillie Multi-Céréales donne de l''énergie à ma fille toute la journée. Produit premium comme promis.'),
('Mariama B.', 5, 'Enfin une marque de confiance pour l''alimentation de nos bébés ! Merci Gnam Gnam !');

-- Enable realtime for reviews
ALTER PUBLICATION supabase_realtime ADD TABLE reviews;

-- ============================================
-- CLIENT ACCOUNTS (Trust-Based Authentication)
-- ============================================

-- Clients table (identified by phone number)
CREATE TABLE IF NOT EXISTS clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  telephone VARCHAR(20) UNIQUE NOT NULL,
  prenom VARCHAR(100),
  nom VARCHAR(100),
  quartier_prefere VARCHAR(100),
  adresse_details TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Orders table (linked to clients)
CREATE TABLE IF NOT EXISTS commandes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id),
  contenu JSONB NOT NULL,
  total INTEGER NOT NULL,
  frais_livraison INTEGER DEFAULT 0,
  mode_livraison VARCHAR(20) DEFAULT 'livraison',
  quartier VARCHAR(100),
  adresse_details TEXT,
  moyen_paiement VARCHAR(20) DEFAULT 'especes',
  statut VARCHAR(20) DEFAULT 'en_attente',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS on new tables
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE commandes ENABLE ROW LEVEL SECURITY;

-- Public policies for clients (read/write own data by phone)
CREATE POLICY "Allow public insert on clients" ON clients
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read on clients" ON clients
  FOR SELECT USING (true);

CREATE POLICY "Allow public update on clients" ON clients
  FOR UPDATE USING (true);

-- Public policies for commandes
CREATE POLICY "Allow public insert on commandes" ON commandes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read on commandes" ON commandes
  FOR SELECT USING (true);

-- Enable realtime for commandes
ALTER PUBLICATION supabase_realtime ADD TABLE commandes;
