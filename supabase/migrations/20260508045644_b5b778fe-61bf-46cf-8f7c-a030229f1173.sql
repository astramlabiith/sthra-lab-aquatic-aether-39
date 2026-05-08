
-- Enums
CREATE TYPE publication_kind AS ENUM ('research', 'conference');
CREATE TYPE award_kind AS ENUM ('pi', 'lab');
CREATE TYPE team_category AS ENUM ('pi','phd','mtech','project_staff','intern','btech','alumni');
CREATE TYPE course_kind AS ENUM ('current', 'upcoming');

-- Publications
CREATE TABLE public.publications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kind publication_kind NOT NULL,
  title TEXT NOT NULL,
  authors TEXT NOT NULL,
  venue TEXT NOT NULL,
  year TEXT NOT NULL,
  abstract TEXT,
  doi TEXT,
  pdf_link TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Awards
CREATE TABLE public.awards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kind award_kind NOT NULL,
  year TEXT NOT NULL,
  award TEXT NOT NULL,
  recipient TEXT NOT NULL,
  organization TEXT,
  description TEXT,
  icon TEXT NOT NULL DEFAULT 'Trophy',
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Team members
CREATE TABLE public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category team_category NOT NULL,
  name TEXT NOT NULL,
  role TEXT,
  specialization TEXT,
  education TEXT,
  email TEXT,
  linkedin TEXT,
  image_url TEXT,
  short_bio TEXT,
  full_bio TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Courses
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  kind course_kind NOT NULL,
  title TEXT NOT NULL,
  semester TEXT,
  instructor TEXT,
  description TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Research grants
CREATE TABLE public.research_grants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  grant_type TEXT,
  duration TEXT,
  institution TEXT,
  description TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Triggers for updated_at
CREATE TRIGGER trg_publications_updated BEFORE UPDATE ON public.publications FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_awards_updated BEFORE UPDATE ON public.awards FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_team_members_updated BEFORE UPDATE ON public.team_members FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_courses_updated BEFORE UPDATE ON public.courses FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_grants_updated BEFORE UPDATE ON public.research_grants FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Enable RLS
ALTER TABLE public.publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.awards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.research_grants ENABLE ROW LEVEL SECURITY;

-- Policies: public read, authenticated full access (single-admin model matching gallery)
CREATE POLICY "Anyone can view publications" ON public.publications FOR SELECT USING (true);
CREATE POLICY "Authenticated manage publications" ON public.publications FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Anyone can view awards" ON public.awards FOR SELECT USING (true);
CREATE POLICY "Authenticated manage awards" ON public.awards FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Anyone can view team_members" ON public.team_members FOR SELECT USING (true);
CREATE POLICY "Authenticated manage team_members" ON public.team_members FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Anyone can view courses" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Authenticated manage courses" ON public.courses FOR ALL TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Anyone can view research_grants" ON public.research_grants FOR SELECT USING (true);
CREATE POLICY "Authenticated manage research_grants" ON public.research_grants FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Storage bucket for content uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('content', 'content', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read content" ON storage.objects FOR SELECT USING (bucket_id = 'content');
CREATE POLICY "Authenticated upload content" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'content');
CREATE POLICY "Authenticated update content" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'content');
CREATE POLICY "Authenticated delete content" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'content');

-- ============ SEED DATA ============

-- Publications: research papers
INSERT INTO public.publications (kind, title, authors, venue, year, abstract, doi, pdf_link, display_order) VALUES
('research','Validation and verification of a planing craft motion prediction model based on experiments conducted on full-size crafts operating in real sea','H Allaka, M Groper','Journal of Marine Science and Technology','2020','This paper focuses on the validation and testing of a computational model for assessing the motion of planing crafts in a seaway. The study aims to improve the design and operability of these crafts by accurately predicting their accelerations and motions.','Journal of Marine Science and Technology','https://link.springer.com/article/10.1007/s00773-020-00709-6',1),
('research','Mitigation of vertical motion in planing crafts for enhanced operationability in seaways using passive energy absorbers–A test of concept','H Allaka, M Farid, M Groper','Ocean Engineering','2022','This research investigates the use of a tuned mass damper (TMD), a type of linear passive energy absorber, to reduce the vertical motion of planing crafts in rough seas. The study found that while the TMD was effective in specific conditions, its overall practicality is limited.','Ocean Engineering','https://www.sciencedirect.com/science/article/pii/S0029801822017188',2),
('research','A Real Time Speed Modulation System to Improve Operational Ability of Autonomous Planing Craft in a Seaway','H Allaka, A Levy, D Levy, T Treibitz, M Groper','International Journal of Maritime Engineering','2020','This study focuses on developing a control system to enhance the seaworthiness of autonomous high-speed planing crafts (APCs). The system aims to mitigate the high vertical accelerations experienced by APCs at high speeds in a seaway, which pose a hazard to the payload and the craft''s structural integrity.','International Journal of Maritime Engineering','https://www.intmaritimeengineering.org/index.php/ijme/article/view/1145',3),
('research','Speed–wave height operational envelope for high-speed planing craft in seaways: theoretical vs. empirical methods','H Allaka, M Groper','Ship Technology Research','2021','This paper compares a nonlinear time-domain approach (MAPCS tool) with existing experimental and empirical formulas for determining the operational limits of high-speed planing crafts. The study finds that the MAPCS approach provides more realistic estimations of vertical accelerations and speed vs. wave height limits.','Ship Technology Research','https://www.tandfonline.com/doi/full/10.1080/09377255.2021.1973263',4);

-- Publications: conference papers
INSERT INTO public.publications (kind, title, authors, venue, year, abstract, doi, pdf_link, display_order) VALUES
('conference','A Multi-Sensor Fusion Framework for Unmanned Aerial Vehicle (UAV) Navigation and Inspection in GPS-Denied and Degraded Environments','Vuppu Venkata Sai Viswa Kiran, Akkala Sainath Reddy, H. Vishal Sri Sai, Himabindu Allaka, R Prasanth Kumar','2026 IEEE Applied Sensing Conference (APSCON)','2026','This paper, presented at an IEEE conference, discusses a method for a Multi-Sensor Fusion Framework for Unmanned Aerial Vehicle (UAV) Navigation and Inspection in GPS-Denied and Degraded Environments.','IEEE Conference Proceedings','#',1),
('conference','Design and Development of a Cost-Effective Unmanned Surface Vehicle (USV) for Inland Water Quality Assessment','Dwivedula Narasimha Sri Sourabh, Vinayak Maharshi, M. Balakumaran, Himabindu Allaka','International and National Conference on Machines and Mechanisms (iNaCoMM), IIT Hyderabad','2025','This paper introduces a compact and cost-effective unmanned surface vehicle (USV) designed to automate lake monitoring. The platform is equipped with real-time water quality sensors and a custom water sampling carousel, allowing for automated water collection at preconfigured waypoints without manual intervention.','IEEE Conference Proceedings','#',2),
('conference','Design and Development of a Unmanned Surface Vehicle (USV) for Sludge Quantification and Inland Water Quality Assessment','Dwivedula Narasimha Sri Sourabh, Vinayak Maharshi, M. Balakumaran, Himabindu Allaka','2026 IEEE Applied Sensing Conference (APSCON)','2026','This study presents LIMUS (Lake Inspection and Monitoring Unmanned Surface Vehicle), a compact USV platform developed to monitor water quality and quantify sludge accumulation. It features in-situ water quality sensors, a custom-built water sampling carousel, and an echosounder that estimates both lake depth and sludge buildup.','IEEE Conference Proceedings','#',3),
('conference','Resilient Navigation for UAVs: GNSS Attack Detection and Seamless Transition to Visual-Inertial Localization','Sainath Reddy Akkala, Dr. Himabindu Allaka','2025 IEEE INDICON','2025','This paper introduces a regenerative navigation framework designed to protect autonomous drones from malicious signal interference. The system utilizes a state-machine architecture that cross-references satellite data with inertial dynamics to identify spoofing and jamming attempts. Once an anomaly is confirmed, the framework autonomously decouples the compromised signals and shifts control to a map-aided visual-inertial navigation stack. This approach ensures mission continuity and operational safety in contested or signal-denied environments by maintaining a robust reference for flight behavior.','IEEE Conference Proceedings','https://ieeexplore.ieee.org/document/11392970',4),
('conference','Estimating sea state using a low cost buoy','S Farber, H Allaka, I Klein, M Groper','IEEE Conference','2018','This paper, presented at an IEEE conference, discusses a method for determining sea conditions using an affordable buoy. This information is crucial for the safe and efficient operation of marine vessels.','IEEE Conference Proceedings','https://ieeexplore.ieee.org/abstract/document/8646100',5),
('conference','Vision-aided speed modulation system to enhance seaworthiness of autonomous planing crafts','H Allaka, D Levy, T Treibitz, M Groper','IEEE Conference','2018','This paper presents a system that uses vision to adjust the speed of autonomous planing crafts. The goal is to improve their stability and performance in various sea conditions.','IEEE Conference Proceedings','https://ieeexplore.ieee.org/abstract/document/8555758',6);

-- Awards: PI
INSERT INTO public.awards (kind, year, award, recipient, organization, description, icon, display_order) VALUES
('pi','2021','Royal Institute of Naval Architecture - Institution''s Calder Prize','Dr. Himabindu Allaka','Royal Institute of Naval Architecture (RINA), UK','Recognized for the best research in the field of naval architecture and marine engineering.','Trophy',1),
('pi','2021','Royal Institute of Naval Architecture - Institution''s Medal','Dr. Himabindu Allaka','Royal Institute of Naval Architecture (RINA), UK','Awarded for exceptional contributions to naval architecture and marine technology research.','Medal',2),
('pi','2019','Mediterranean Sea Research Center of Israel Scholarship','Dr. Himabindu Allaka','Mediterranean Sea Research Center of Israel','Scholarship awarded for outstanding research contributions in marine science and technology.','Award',3),
('pi','2018','Summa Cum Laude','Dr. Himabindu Allaka','Technion – Israel Institute of Technology','Awarded for exceptional academic performance and research excellence in Master''s degree.','GraduationCap',4),
('pi','2015-2017','Hatter Maurice Scholarship','Dr. Himabindu Allaka','Hatter Department of Marine Technologies','Multi-year scholarship for outstanding research in marine technologies and engineering.','Award',5),
('pi','2016 & 2017','Yoel Carasso Scholarship','Dr. Himabindu Allaka','Academic Institution','Awarded for exceptional academic performance and research contributions.','Star',6),
('pi','2013-2014','Lady Davis Fellowship','Dr. Himabindu Allaka','Lady Davis Fellowship Trust','Prestigious fellowship awarded for outstanding research potential and academic excellence.','Trophy',7),
('pi','2004','Selected in All India School Entrance (Jawahar Navodaya Vidyalaya)','Dr. Himabindu Allaka','Jawahar Navodaya Vidyalaya','Selected through competitive national entrance examination for admission to prestigious school system.','GraduationCap',8);

-- Awards: Lab
INSERT INTO public.awards (kind, year, award, recipient, organization, description, icon, display_order) VALUES
('lab','2026','Best Poster of the Conference','Vuppu Venkata Sai Viswa Kiran, Akkala Sainath Reddy, H. Vishal Sri Sai, Dr. Himabindu Allaka, Dr. R Prasanth Kumar','IEEE APSCON 2026','Recognized as the Best Poster among all international submissions at the IEEE Applied Sensing Conference (APSCON).','Trophy',1),
('lab','2026','Best Project of the Course — Military & Institutional Honors','Astram Lab & MCEME Team','Military College of Electrical and Mechanical Engineering (MCEME)','The collaborative project, "USV for Maritime Surveillance and Situational Awareness," was distinguished as the Best Project of the course. The honor was formally presented by the Lt. General of MCEME for excellence in unmanned surface vehicle development and tactical application.','Medal',2),
('lab','2025','Special Mention Award','Sainath Reddy Akkala, H. Vishal Sri Sai, Dr. Himabindu Allaka','International Knowledge Millennium Conference (IKMC)','Awarded at the International Knowledge Millennium Conference (IKMC) for the project "Mrinal," in the Category of strategic autonomy.','Star',3);

-- Team members
INSERT INTO public.team_members (category, name, role, specialization, education, email, linkedin, image_url, short_bio, full_bio, display_order) VALUES
('pi','Dr. Himabindu Allaka','Principal Investigator','Assistant Professor, Department of Mechanical and Aerospace Engineering','PhD (Gold Medal & Calder Prize - RINA, UK), MSc (Summa Cum Laude)',NULL,NULL,'/lovable-uploads/0c244085-4709-4483-bed9-e6313795429e.png','Dr. Himabindu Allaka is currently serving as an Assistant Professor in the Department of Mechanical and Aerospace Engineering (MAE) at the Indian Institute of Technology Hyderabad (IITH) since July 2024. She brings a rich interdisciplinary background spanning mechanical engineering, marine technologies, control systems, AI/ML, mechatronics, and robotics programming. Prior to joining IITH, she worked as a Manager at the Production Technology Development Centre, L&T Defence, where she was deeply involved in the development of AI/ML algorithms aimed at enhancing surveillance, target recognition, and autonomous navigation capabilities for aerial, surface, and underwater unmanned platforms.','Her academic journey began at Jawahar Navodaya Vidyalaya, followed by a B.Tech in Mechanical Engineering from JNTU Hyderabad. She then spent seven transformative years in Israel, engaged in graduate research at both the University of Haifa and the Technion – Israel Institute of Technology, completing her MSc (Summa Cum Laude) and PhD through the Hatter Department of Marine Technologies. Her master''s research focused on the ''Motion Assessment of Planing Craft in Seaway (MAPCS),'' a nonlinear motion prediction model for high-speed marine crafts. Inspired by this work, she pursued her doctoral thesis titled ''Methods for Enhancing the Operationability of Autonomous Planing Monohulls,'' which received the Gold Medal and Calder Prize from the Royal Institute of Naval Architecture (RINA), UK, recognizing it as the best research in the field.',1),
('mtech','Dwivedula Narasimha Sri Sourabh',NULL,'Project DRONA',NULL,'dnvsourabh@gmail.com','https://www.linkedin.com/in/sourabh-dwivedula-28410219b','/lovable-uploads/cad58e69-1e8e-4ff0-aaa4-2a3fe29730d2.png','Working on Dynamic ROV for Near-field Assessment with precision maneuvering capabilities',NULL,1),
('mtech','Vishal Dilip Khandare',NULL,'Project SURAKSHA',NULL,'me24mtech11001@iith.ac.in',NULL,'/lovable-uploads/afdb516b-4ad5-493d-8505-ce4029475c90.png','Developing Surveillance USV for Harbor and Border Security with autonomous patrolling capabilities',NULL,2),
('mtech','Vinayak Maharshi',NULL,'Project LIMUS',NULL,'maharshivinayak@gmail.com','https://www.linkedin.com/in/vinayak-maharshi','/lovable-uploads/e9162ee5-ba2d-483a-b8cb-e2ef43f9e699.png','Working on Lake Inspection & Monitoring Unmanned Surface Vehicle with integrated water sampling',NULL,3),
('intern','AKKALA SAINATH REDDY',NULL,'Project MRINAL',NULL,'sainathreddyakkala@gmail.com','https://www.linkedin.com/in/sainathreddyakkala/','/lovable-uploads/d498b892-a513-491f-ad6e-68b63b3516d2.png','Working on Modular Robotic Intelligent Navigator for Aquatic Life with bio-inspired propulsion',NULL,1),
('intern','Vaishnavi Kore',NULL,'Project GATI',NULL,'vaishnavikore2008@gmail.com','https://www.linkedin.com/in/vaishnavi-kore-668a8b270','/lovable-uploads/38f029d2-92ef-4d58-bba6-2ae1608be37d.png','Contributing to GPS-Denied Aerial Drone development with focus on autonomous navigation systems',NULL,2),
('intern','M.Balakumaran',NULL,'Project DRONA',NULL,'balakumaranm2003m@gmail.com','https://www.linkedin.com/in/bk2k3','/lovable-uploads/2b28ef41-425f-4749-a776-3f18c3e97385.png','Assisting in Dynamic ROV development with focus on tight underwater space maneuvering',NULL,3),
('intern','H. Vishal Sri Sai',NULL,'Project MRINAL',NULL,'vishalsrisai.h@gmail.com','https://www.linkedin.com/in/hvishalsrisai','/lovable-uploads/1802cbaa-8714-415c-9ce1-5082401b496e.png','Working on Modular Robotic Intelligent Navigator for Aquatic Life with bio-inspired propulsion',NULL,4),
('btech','Saragadam Yagna Sri',NULL,'Project NEERA',NULL,'saragadamyagnasri@gmail.com','https://www.linkedin.com/in/saragadam-yagna-sri2519','/lovable-uploads/b1227e48-e6b1-463a-b84a-98c328c22760.png','Working on Nearshore Economical Exploration ROV/AUV with convertible operation modes',NULL,1),
('btech','Varad N. Mallurwar',NULL,'Project NEERA',NULL,'varadmallurwar10@gmail.com','http://www.linkedin.com/in/varad-mallurwar-608624289','/lovable-uploads/ca7c08d6-ec1d-405d-82f1-c45a931a1126.png','Contributing to NEERA development with focus on modular payload systems for water quality testing',NULL,2);

-- Courses
INSERT INTO public.courses (kind, title, semester, instructor, description, display_order) VALUES
('current','ME5073 Marine Robotics','Jan 25 – April 25','Dr. Himabindu Allaka','Advanced course covering marine robotics principles, underwater systems design, and autonomous navigation in marine environments.',1),
('current','ME3413 Machine Drawing & Solid Modelling','Jan 25 – April 25','Dr. Himabindu Allaka','Comprehensive course on technical drawing, CAD principles, and solid modeling techniques for mechanical engineering applications.',2),
('upcoming','ME5770 Fundamentals of Robotics','Jul 25 – Nov 25','Dr. Himabindu Allaka','Introduction to robotics fundamentals, including kinematics, dynamics, control systems, and programming for robotic applications.',1),
('upcoming','ME5051 Sensors and Actuators','Jul 25 – Nov 25','Dr. Himabindu Allaka','Study of various sensors and actuators used in mechanical systems, with focus on selection, integration, and applications in automation.',2);

-- Research grants
INSERT INTO public.research_grants (title, grant_type, duration, institution, description, display_order) VALUES
('Development of an Unmanned Surface Vehicle (USV) Platform for In-Situ Water Sampling, Bathymetry, Sludge Quantification, and Monitoring of Urban Lakes','Seed Grant','Jul 24 – Present','IIT Hyderabad','Research project focused on developing autonomous surface vehicles for comprehensive water quality monitoring and environmental assessment.',1),
('Development of a Sensor Suite for Enhanced Situational Awareness and GNSS-Denied Navigation in Multi-Domain Manned and Unmanned Systems','ANRF: Early Career Research Grant','Jul 24 – Present','IIT Hyderabad','Advanced research on sensor fusion technologies for autonomous navigation in challenking environments without GPS dependency.',2);
