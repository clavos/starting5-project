<?php

namespace AppBundle\Repository;
use AppBundle\Entity\Trainer;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Mapping;

/**
 * TrainerRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class TrainerRepository extends \Doctrine\ORM\EntityRepository
{
    public $countTrainer;

    public function __construct(EntityManager $em, Mapping\ClassMetadata $class)
    {
        parent::__construct($em, $class);
        $this->countTrainer = count($this->findAll());
    }

    public function getAllIds()
    {
        $ids = [];
        foreach ($this->findAll() as $trainer) {
            $ids[] = $trainer->getId();
        }

        return $ids;
    }

    public function getRandomTrainer()
    {
        $id = array_rand($this->getAllIds());
        $trainer = $this->find($id);
        if($trainer){

            return $trainer;
        }

        return $trainer;
    }
}