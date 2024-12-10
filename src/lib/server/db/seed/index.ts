import { seedRoles } from './roles';

async function main() {
  try {
    console.log('🌱 Seeding database...');
    await seedRoles();
    console.log('✅ Database seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

main(); 