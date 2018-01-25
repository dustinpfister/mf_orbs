var Orb = (function () {

    // set orb values by a given ratio, and level
    var setByRatio = function (ratio, level) {

        var self = this;

        // set level, and ratio to given values
        this.level = level || 1;
        this.ratio = Array.from(ratio) || [1, 0, 0, 0];

        // find points
        this.points = [];
        this.ratio.forEach(function (pt, i) {

            self.points[i] = pt * level;

        });

    };

    // set orb values based on a given points array
    var setByPoints = function (points) {

        var self = this;

        this.points = Array.from(points);
        this.ratio = [];
        this.level = Infinity;

        // the lowest point is the level
        this.points.forEach(function (pt, i) {

            if (pt < self.level && pt > 0) {

                self.level = pt;

            }

        });

        // find the ratio from points
        this.points.forEach(function (pt, i) {

            self.ratio[i] = pt / self.level;

        });

    };

    // combine one or more orbs with this one
    var fromOrbs = function (orbs) {

        var points = [0, 0, 0, 0],
        tab = function (orb) {

            orb.points.forEach(function (pt, i) {

                points[i] += pt;

            });

        };

        // if Array of Orbs (combine, new from)
        if (orbs.constructor.name === 'Array') {

            orbs.forEach(function (orb) {

                tab(orb);

            });

            setByPoints.call(this, points);

        } else {

            // assume just single orb is given

            // then just set by the given orbs points (clone orb)
            setByPoints.call(this, orbs.points);

        }

    };

    var findType = function () {

        var oneCT = 0,
        nonOne = false;
        oneTypes = ['pure', 'dual', 'tripple', 'quad'];

        // find count of 1's in the ratio
        this.ratio.forEach(function (pt) {

            if (pt === 1) {

                oneCT += 1;

            } else {

                if (pt != 0) {

                    nonOne = true;

                }

            }

        });

        // default to a type based on count of ones in ratio
        this.type = oneTypes[oneCT - 1];

        // if any value that is not 1 is in the ratio then default to composite
        if (nonOne) {

            this.type = 'composite';

        }

    };

    // the Orb constructor
    var Orb = function (opt) {

        var self = this;

        opt = opt || {};
        opt.points = opt.points || null;
        opt.ratio = opt.ratio || null;
        opt.level = opt.level || null;
        opt.recipies = opt.recipies || [];

        // if points i opt, set by points
        if (opt.points) {

            setByPoints.call(this, opt.points);

        }

        // if ratio in opt, set by ratio, and level
        if (opt.ratio) {

            setByRatio.call(this, opt.ratio, opt.level);

        }

        // if orbs in opt set by one or more given orbs
        if (opt.orbs) {

            fromOrbs.call(this, opt.orbs);

        }

        // if just calling new Orb()
        if (!opt.points && !opt.ratio && !opt.orbs) {

            setByPoints.call(this, [1, 0, 0, 0]);

        }

        this.worth = 0;
        this.points.forEach(function (pt) {

            self.worth += pt;

        });

        findType.call(this);

    };

    return Orb;

}
    ());
