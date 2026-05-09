
CREATE TYPE project_category AS ENUM ('UAVs','AUVs','ROVs','USVs','GNSS','Mars Rovers');
CREATE TYPE career_kind AS ENUM ('Internship','Hiring');

CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category project_category NOT NULL,
  title text NOT NULL,
  image_url text,
  description text,
  progress integer NOT NULL DEFAULT 0,
  publications text[] NOT NULL DEFAULT '{}',
  link text,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Authenticated manage projects" ON public.projects FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE TRIGGER upd_projects BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.hero_slides (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  caption text,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view hero_slides" ON public.hero_slides FOR SELECT USING (true);
CREATE POLICY "Authenticated manage hero_slides" ON public.hero_slides FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE TABLE public.careers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kind career_kind NOT NULL,
  title text NOT NULL,
  description text,
  requirements text[] NOT NULL DEFAULT '{}',
  apply_link text,
  apply_email text,
  is_open boolean NOT NULL DEFAULT true,
  display_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.careers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view careers" ON public.careers FOR SELECT USING (true);
CREATE POLICY "Authenticated manage careers" ON public.careers FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE TRIGGER upd_careers BEFORE UPDATE ON public.careers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Seed projects from existing static data
INSERT INTO public.projects (category, title, image_url, description, progress, publications, link, display_order) VALUES
('UAVs','GATI','/lovable-uploads/da53a3a9-ab22-4174-9236-d4f144f870d6.png','GPS-Denied Aerial Drone for Indoor/Outdoor Navigation with Visual-SLAM and IMU-based autonomous navigation, reliable operation in GPS-denied and signal-degraded zones',35,ARRAY['GPS Solutions Journal','Navigation'],NULL,0),
('AUVs','NEERA – Nearshore Economical Exploration ROV/AUV','/lovable-uploads/e1fdfee1-4a66-402f-9f6c-92fc126e2f53.png','Convertible between autonomous (AUV) and tethered (ROV) modes, equipped with sensors for tunnel inspections, modular payload for in-situ water quality testing, lightweight low-cost platform for scalable deployments',10,ARRAY['IEEE Transactions on Robotics','ICRA 2024'],NULL,0),
('ROVs','NEERA – Nearshore Economical Exploration ROV/AUV','/lovable-uploads/e1fdfee1-4a66-402f-9f6c-92fc126e2f53.png','Convertible between autonomous (AUV) and tethered (ROV) modes, equipped with sensors for tunnel inspections, modular payload for in-situ water quality testing, lightweight low-cost platform for scalable deployments',10,ARRAY['OCEANS 2023','IEEE Robotics & Automation'],NULL,0),
('ROVs','DRONA – Dynamic ROV for Near-field Assessment','/lovable-uploads/ff0baa1e-3993-4d44-af94-a09751b227d9.png','Precise maneuvering in tight underwater spaces with live camera and sonar data feeds, hovering capability for close-up infrastructure scanning, and integrated gripper mechanism',10,ARRAY['IEEE Robotics & Automation Magazine'],NULL,1),
('ROVs','MRINAL – Modular Robotic Intelligent Navigator for Aquatic Life','/lovable-uploads/mrinal-rov.jpg','Bio-inspired propulsion with gentle motion safe for aquatic livestock, pH, DO, and feed dispersion monitoring, corrosion-resistant body for long-duration usage',92,ARRAY['Marine Biology Engineering'],'https://www.astramlabiith.in/mrinal/',2),
('ROVs','DVAYAM – Dual-Domain Vehicle for Aquatic and Aerial Mobility','/lovable-uploads/5a08d394-1050-4952-86da-cfc45e78f624.png','Seamless transition between water and air, amphibious locomotion for hard-to-access areas, suitable for exploration and monitoring in dynamic environments with AI-guided domain shift decision-making',5,ARRAY['Advanced Robotics Journal'],NULL,3),
('USVs','LIMUS – Lake Inspection & Monitoring Unmanned Surface Vehicle','/lovable-uploads/c57d9bbb-bd40-40e9-8f3c-7299dd65f779.png','A one-man portable USV platform that fits in a car trunk with integrated water sampling mechanism, manual and autonomous modes of operation, and modular payload for lake-specific research',75,ARRAY['Marine Technology Society Journal'],NULL,0),
('USVs','SURAKSHA – Surveillance USV for Harbor and Border Security','/lovable-uploads/suraksha-usv.png','Surveillance and patrolling in harbor regions via remote/autonomous modes with vision and radar-based anomaly & intrusion detection, operates under all visibility conditions with integrated data relay to control station',75,ARRAY['Ocean Engineering','Autonomous Robots'],NULL,1),
('USVs','TARANGA – Wave Buoy for Oceanographic Estimation','/lovable-uploads/fc0e0812-c7d6-499e-be8a-592f327c99b7.png','Real-time wave height and period measurement with lightweight and easy to deploy design, featuring modular design for long-term anchoring',100,ARRAY['Oceanographic Journal'],NULL,2),
('GNSS','GATI – GPS-Denied Aerial Drone for Indoor/Outdoor Navigation','/lovable-uploads/da53a3a9-ab22-4174-9236-d4f144f870d6.png','Visual-SLAM and IMU-based autonomous navigation with reliable operation in GPS-denied and signal-degraded zones, modular and compact for indoor infrastructure inspection with seamless transition between indoor and outdoor missions',35,ARRAY['GPS Solutions Journal','Navigation'],NULL,0),
('Mars Rovers','Coming Soon','https://images.unsplash.com/photo-1446776877081-d282a0f896e2?auto=format&fit=crop&w=800&q=80','Mars rover projects will be introduced in the future. Stay tuned for exciting developments in planetary exploration technology.',0,ARRAY['To be announced'],NULL,0);

-- Seed hero slide with current image
INSERT INTO public.hero_slides (image_url, caption, display_order) VALUES
('https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80', NULL, 0);

-- Seed careers from existing JoinUs static data
INSERT INTO public.careers (kind, title, description, requirements, display_order) VALUES
('Internship','Research Intern - Autonomous Systems','Internship opportunity for Undergraduate students interested in autonomous systems research',ARRAY['B tech student (2nd/3rd/4th year)','interested in robotics and control systems','fundamental level knowledge in any of the multi domainer aspects and Computer vision'],0);
