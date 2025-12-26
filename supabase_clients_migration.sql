-- ============================================
-- CLIENT ACCOUNTS MIGRATION
-- Only run this after initial setup is complete
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

-- Public policies for clients
DROP POLICY IF EXISTS "Allow public insert on clients" ON clients;
DROP POLICY IF EXISTS "Allow public read on clients" ON clients;
DROP POLICY IF EXISTS "Allow public update on clients" ON clients;

CREATE POLICY "Allow public insert on clients" ON clients
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read on clients" ON clients
  FOR SELECT USING (true);

CREATE POLICY "Allow public update on clients" ON clients
  FOR UPDATE USING (true);

-- Public policies for commandes
DROP POLICY IF EXISTS "Allow public insert on commandes" ON commandes;
DROP POLICY IF EXISTS "Allow public read on commandes" ON commandes;

CREATE POLICY "Allow public insert on commandes" ON commandes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read on commandes" ON commandes
  FOR SELECT USING (true);

-- Enable realtime for commandes (ignore error if already exists)
DO $$
BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE commandes;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;
