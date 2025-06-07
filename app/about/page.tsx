"use client";

import {
  ExternalLink,
  Database,
  Map,
  Volume2,
  Heart,
  Leaf,
  Users,
  Globe,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
            About Wander
          </h1>
          <p className="text-lg text-green-600 max-w-2xl mx-auto">
            An immersive virtual forest exploration platform that brings
            nature's wonders to your screen through cutting-edge technology and
            real scientific data
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold text-green-800 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Wander aims to connect people with nature through innovative
              technology, providing an educational and engaging way to explore
              forest ecosystems from anywhere in the world. We believe that
              understanding and appreciating biodiversity is crucial for
              conservation efforts and environmental stewardship.
            </p>
            <p className="text-gray-600 leading-relaxed">
              By combining real scientific data with immersive digital
              experiences, we hope to inspire a new generation of nature
              enthusiasts, researchers, and environmental advocates who will
              help protect our planet's precious ecosystems.
            </p>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=300&fit=crop&auto=format"
              alt="Forest Conservation"
              className="w-full h-64 object-cover rounded-2xl shadow-lg"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader className="text-center">
              <Map className="mx-auto text-green-600 mb-2" size={32} />
              <CardTitle className="text-lg">Interactive Exploration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 text-center">
                Navigate through diverse forest regions with our intuitive
                interactive map interface powered by modern web technologies
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Database className="mx-auto text-blue-600 mb-2" size={32} />
              <CardTitle className="text-lg">Scientific Data</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 text-center">
                Species information powered by the iNaturalist API and
                comprehensive scientific databases from around the world
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Heart className="mx-auto text-red-600 mb-2" size={32} />
              <CardTitle className="text-lg">Personal Collection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 text-center">
                Save your favorite species and regions for future reference and
                build your personal nature discovery journal
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-green-800 flex items-center gap-2">
                <Leaf size={24} />
                Educational Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>
                    Learn about biodiversity and ecosystem relationships
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>
                    Understand conservation challenges and success stories
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>Explore species habitats and behavioral patterns</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  <span>
                    Discover the interconnectedness of forest ecosystems
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-green-800 flex items-center gap-2">
                <Users size={24} />
                Target Audience
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Students and educators in environmental sciences</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Nature enthusiasts and wildlife photographers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Researchers and conservation professionals</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>
                    Anyone curious about forest ecosystems and biodiversity
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
            Technology & Data Sources
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Database size={20} />
                Data Sources
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <ExternalLink size={16} />
                  <a
                    href="https://www.inaturalist.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green-600 transition-colors"
                  >
                    iNaturalist Global Database
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Globe size={16} />
                  <span>
                    International Union for Conservation of Nature (IUCN)
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Database size={16} />
                  <span>Global Biodiversity Information Facility (GBIF)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Leaf size={16} />
                  <span>Encyclopedia of Life (EOL)</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Technology Stack
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Next.js 14 with App Router</li>
                <li>• React 18 with TypeScript</li>
                <li>• Mapbox GL JS for interactive mapping</li>
                <li>• Web Audio API for ambient sounds</li>
                <li>• Framer Motion for smooth animations</li>
                <li>• Recharts for data visualization</li>
                <li>• Tailwind CSS for responsive design</li>
                <li>• Local Storage for user preferences</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
            <h4 className="text-lg font-semibold text-green-800 mb-3">
              Platform Features
            </h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
              <div>
                <strong>Interactive Elements:</strong>
                <ul className="mt-1 space-y-1">
                  <li>• Clickable region exploration</li>
                  <li>• Species carousel navigation</li>
                  <li>• Detailed information pop-ups</li>
                </ul>
              </div>
              <div>
                <strong>Data Visualization:</strong>
                <ul className="mt-1 space-y-1">
                  <li>• Species distribution charts</li>
                  <li>• Conservation status tracking</li>
                  <li>• Ecosystem statistics</li>
                </ul>
              </div>
              <div>
                <strong>User Experience:</strong>
                <ul className="mt-1 space-y-1">
                  <li>• Favorites management system</li>
                  <li>• Ambient audio controls</li>
                  <li>• Responsive mobile design</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-800 text-center">
              <strong>Development Note:</strong> This is a demonstration
              platform showcasing modern web development techniques. In a
              production environment, live API integration would provide
              real-time species data, observations, and community-contributed
              content from the global naturalist community.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold text-green-800 mb-4">
            Join the Conservation Movement
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Every species discovered through Wander represents a step toward
            greater environmental awareness. Together, we can build a more
            sustainable future by understanding and protecting the natural world
            around us.
          </p>
        </div>
      </div>
    </div>
  );
}
